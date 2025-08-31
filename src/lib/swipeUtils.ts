export interface SwipeDirection {
  direction: 'left' | 'right' | 'up' | 'down' | null;
  distance: number;
  velocity: number;
}

export interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

export const calculateSwipeDirection = (
  startPoint: TouchPoint,
  endPoint: TouchPoint,
  threshold: number = 50
): SwipeDirection => {
  const deltaX = endPoint.x - startPoint.x;
  const deltaY = endPoint.y - startPoint.y;
  const deltaTime = endPoint.timestamp - startPoint.timestamp;
  
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const velocity = distance / deltaTime;
  
  // Check if swipe distance meets threshold
  if (distance < threshold) {
    return { direction: null, distance, velocity };
  }
  
  // Determine primary direction
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);
  
  if (absDeltaX > absDeltaY) {
    // Horizontal swipe
    return {
      direction: deltaX > 0 ? 'right' : 'left',
      distance,
      velocity
    };
  } else {
    // Vertical swipe
    return {
      direction: deltaY > 0 ? 'down' : 'up',
      distance,
      velocity
    };
  }
};

export const getSwipeTransform = (
  deltaX: number,
  deltaY: number,
  maxRotation: number = 30
): string => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
  const rotation = (deltaX / windowWidth) * maxRotation;
  return `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
};

export const getSwipeOpacity = (deltaX: number): number => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
  const maxDistance = windowWidth / 2;
  const opacity = 1 - Math.abs(deltaX) / maxDistance;
  return Math.max(0.3, Math.min(1, opacity));
};

export const shouldCardExit = (
  deltaX: number,
  velocity: number,
  threshold: number = 100
): boolean => {
  const distance = Math.abs(deltaX);
  return distance > threshold || velocity > 0.5;
};

export const getCardExitDirection = (deltaX: number): 'left' | 'right' => {
  return deltaX > 0 ? 'right' : 'left';
};