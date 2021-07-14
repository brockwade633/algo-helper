import { RefObject } from 'react';

export interface GraphAnimationProps {
  containerRef: RefObject<HTMLDivElement> | undefined;
  isRendered: Function;
}
