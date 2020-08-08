import React, { ReactNode, memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import { snapPoint, verticalPanGestureHandler } from 'react-native-redash';

import { THRESHOLD } from './Search';

const {
  SpringUtils,
  Value,
  Clock,
  eq,
  startClock,
  set,
  add,
  and,
  greaterOrEq,
  lessOrEq,
  cond,
  decay,
  block,
  not,
  spring,
  abs,
  multiply,
  divide,
  sub,
  debug,
  useCode,
  call,
  neq,
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface ScrollViewProps {
  children: ReactNode;
}

interface WithScrollParams {
  translationY: Animated.Value<number>;
  velocityY: Animated.Value<number>;
  state: Animated.Value<State>;
  containerHeight: number;
  contentHeight: number;
}

export default memo(({ children }: ScrollViewProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const { gestureHandler, translationY, velocityY, state } = useMemoOne(
    () => verticalPanGestureHandler(),
    []
  );

  const withScroll = ({
    translationY,
    velocityY,
    state: gestureState,
    containerHeight,
    contentHeight,
  }: WithScrollParams) => {
    const clock = new Clock();
    const offset = new Value(0);
    const upperbound = 0;
    const lowerbound = -1 * (contentHeight - containerHeight);
    const state = {
      time: new Value(0),
      position: new Value(0),
      velocity: new Value(0),
      finished: new Value(0),
    };
    const isinBound = and(
      lessOrEq(state.position, upperbound),
      greaterOrEq(state.position, upperbound)
    );
    const config = SpringUtils.makeDefaultConfig();
    return block([
      startClock(clock),
      cond(
        eq(gestureState, State.ACTIVE),
        [
          set(state.position, add(offset, translationY)),
          set(state.velocity, velocityY),
          set(state.time, 0),
          cond(
            not(isinBound),
            set(state.position, multiply(state.position, 0.4))
          ),
        ],
        [
          set(offset, state.position),
          cond(
            isinBound,
            [decay(clock, state, { deceleration: 0.997 })],
            [
              set(
                config.toValue,
                snapPoint(state.position, state.velocity, [
                  lowerbound,
                  upperbound,
                ])
              ),
              spring(clock, state, config),
            ]
          ),
        ]
      ),
      // debug('State Position', state.position),
      state.position,
    ]);
  };
  const translateY = withScroll({
    translationY,
    velocityY,
    state,
    containerHeight,
    contentHeight,
  });
  return (
    <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: { height },
        },
      }) => console.log('Conatiner Height', height)}
    >
      <PanGestureHandler
        {...gestureHandler}
        // onGestureEvent={(e) => console.log(e.nativeEvent.translationY)}
      >
        <Animated.View
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => console.log('content height', height)}
          style={{ transform: [{ translateY }] }}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
});
