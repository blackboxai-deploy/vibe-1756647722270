"use client";

import { useState, useCallback, useRef } from 'react';
import { TouchPoint, calculateSwipeDirection, SwipeDirection } from '@/lib/swipeUtils';

export interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeStart?: (point: TouchPoint) => void;
  onSwipeMove?: (currentPoint: TouchPoint, deltaX: number, deltaY: number) => void;
  onSwipeEnd?: (direction: SwipeDirection) => void;
}

export interface SwipeGestureState {
  isActive: boolean;
  startPoint: TouchPoint | null;
  currentPoint: TouchPoint | null;
  deltaX: number;
  deltaY: number;
}

export const useSwipeGesture = (handlers: SwipeHandlers = {}) => {
  const [gestureState, setGestureState] = useState<SwipeGestureState>({
    isActive: false,
    startPoint: null,
    currentPoint: null,
    deltaX: 0,
    deltaY: 0
  });

  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  const getEventPoint = useCallback((e: TouchEvent | MouseEvent): TouchPoint => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX,
      y: clientY,
      timestamp: Date.now()
    };
  }, []);

  const handleStart = useCallback((e: TouchEvent | MouseEvent) => {
    const point = getEventPoint(e);
    
    setGestureState({
      isActive: true,
      startPoint: point,
      currentPoint: point,
      deltaX: 0,
      deltaY: 0
    });

    handlersRef.current.onSwipeStart?.(point);
  }, [getEventPoint]);

  const handleMove = useCallback((e: TouchEvent | MouseEvent) => {
    e.preventDefault();
    
    setGestureState(prevState => {
      if (!prevState.isActive || !prevState.startPoint) return prevState;
      
      const currentPoint = getEventPoint(e);
      const deltaX = currentPoint.x - prevState.startPoint.x;
      const deltaY = currentPoint.y - prevState.startPoint.y;

      handlersRef.current.onSwipeMove?.(currentPoint, deltaX, deltaY);

      return {
        ...prevState,
        currentPoint,
        deltaX,
        deltaY
      };
    });
  }, [getEventPoint]);

  const handleEnd = useCallback(() => {
    setGestureState(prevState => {
      if (!prevState.isActive || !prevState.startPoint || !prevState.currentPoint) {
        return {
          isActive: false,
          startPoint: null,
          currentPoint: null,
          deltaX: 0,
          deltaY: 0
        };
      }

      const swipeDirection = calculateSwipeDirection(prevState.startPoint, prevState.currentPoint);
      
      handlersRef.current.onSwipeEnd?.(swipeDirection);

      // Trigger specific swipe direction handlers
      switch (swipeDirection.direction) {
        case 'left':
          handlersRef.current.onSwipeLeft?.();
          break;
        case 'right':
          handlersRef.current.onSwipeRight?.();
          break;
        case 'up':
          handlersRef.current.onSwipeUp?.();
          break;
        case 'down':
          handlersRef.current.onSwipeDown?.();
          break;
      }

      return {
        isActive: false,
        startPoint: null,
        currentPoint: null,
        deltaX: 0,
        deltaY: 0
      };
    });
  }, []);

  const bindEvents = useCallback(() => {
    return {
      onTouchStart: handleStart,
      onTouchMove: handleMove,
      onTouchEnd: handleEnd,
      onMouseDown: handleStart,
      onMouseMove: gestureState.isActive ? handleMove : undefined,
      onMouseUp: gestureState.isActive ? handleEnd : undefined,
      onMouseLeave: gestureState.isActive ? handleEnd : undefined,
    };
  }, [handleStart, handleMove, handleEnd, gestureState.isActive]);

  return {
    gestureState,
    bindEvents
  };
};