import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  GestureResponderEvent,
  PanResponderGestureState
} from 'react-native';

interface PinchZoomViewProps {
  scalable?: boolean;
  minScale?: number;
  maxScale?: number;
  style?: any;
  children?: React.ReactNode;
}

const PinchZoomView: React.FC<PinchZoomViewProps> = ({scalable = true, minScale = 0.5, maxScale = 2, style, children}) => {

  const [scale, setScale] = useState<number>(1);
  const [lastScale, setLastScale] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [lastX, setLastX] = useState<number>(0);
  const [lastY, setLastY] = useState<number>(0);
  const [lastMovePinch, setLastMovePinch] = useState<boolean>(false);

  const distantRef = useRef(150);

  const gestureHandlers = PanResponder.create({
    onStartShouldSetPanResponder: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => false,
    onMoveShouldSetPanResponder: (e: GestureResponderEvent, gestureState: PanResponderGestureState) =>
      scalable &&
      (Math.abs(gestureState.dx) > 2 ||
        Math.abs(gestureState.dy) > 2 ||
        gestureState.numberActiveTouches === 2),
    onPanResponderGrant: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      setLastX(0);
      setLastY(0);
      setLastMovePinch(false);

      if (gestureState.numberActiveTouches === 2) {
        const dx = Math.abs(
          e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX
        );
        const dy = Math.abs(
          e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY
        );
        const distant = Math.sqrt(dx * dx + dy * dy);
        distantRef.current = distant;
      }
    },
    onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      // zoom
      if (gestureState.numberActiveTouches === 2) {
        const dx = Math.abs(
          e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX
        );
        const dy = Math.abs(
          e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY
        );
        const distant = Math.sqrt(dx * dx + dy * dy);
        const newScale = (distant / distantRef.current) * lastScale;

        if (newScale < maxScale && newScale > minScale) {
          setScale(newScale);
          setLastMovePinch(true);
        }
      }
      // translate
      else if (gestureState.numberActiveTouches === 1) {
        if (lastMovePinch) {
          gestureState.dx = 0;
          gestureState.dy = 0;
        }

        const newOffsetX = lastX + gestureState.dx / scale;
        const newOffsetY = lastY + gestureState.dy / scale;

        setOffsetX(newOffsetX);
        setOffsetY(newOffsetY);
        setLastMovePinch(false);
        setLastX(newOffsetX);
        setLastY(newOffsetY);
      }
    },
    onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      setLastX(offsetX);
      setLastY(offsetY);
      setLastScale(scale);
    },
    onPanResponderTerminationRequest: (evt) => true,
    onShouldBlockNativeResponder: (evt) => false,
  });

  const handleDoubleClick = () => {
    // Restore to the original state
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
    setLastX(0);
    setLastY(0);
    setLastMovePinch(false);
    setLastScale(1);
  };

  return (
    <View
      {...gestureHandlers.panHandlers}
      style={[
        styles.container,
        style,
        {
          transform: [
            {scaleX: scale},
            {scaleY: scale},
            {translateX: offsetX},
            {translateY: offsetY},
          ],
        },
      ]}
    >
      <TouchableOpacity onPress={handleDoubleClick}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PinchZoomView;
