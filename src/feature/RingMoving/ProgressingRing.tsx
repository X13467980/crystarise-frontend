'use client';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  /** 0–100 */
  value: number;
  /** px (outer box) */
  size?: number;
  /** px stroke width */
  strokeWidth?: number;
  /** seconds for the ease animation */
  durationSec?: number;
  /** track & progress colors */
  trackColor?: string;
  progressColor?: string;
  /** start animating from 0 on mount/prop change */
  animateFromZero?: boolean;
  className?: string;
};

export default function ProgressRing({
  value,
  size = 244,
  strokeWidth = 12,
  durationSec = 10., // ← デフォルトをゆっくりめに
  trackColor = '#E9FCFF',
  progressColor = '#1CE8FF',
  animateFromZero = true,
  className = '',
}: Props) {
  // clamp 0..100
  const target = Math.max(0, Math.min(100, value));

  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  // animate value
  const [animated, setAnimated] = useState(animateFromZero ? 0 : target);

  useEffect(() => {
    if (!animateFromZero) {
      setAnimated(target);
      return;
    }

    // 値が入ってから少し遅延してアニメーション開始
    const timer = setTimeout(() => {
      setAnimated(target);
    }, 150); // 150ms 後にアニメーション開始

    return () => clearTimeout(timer);
  }, [target, animateFromZero]);

  const dashOffset = useMemo(
    () => circumference * (1 - animated / 100),
    [animated, circumference]
  );

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        // rotate -90deg so filling starts at 12 o’clock
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: `stroke-dashoffset ${durationSec}s cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      </svg>

      {/* Optional inner content slot */}
      <div className="absolute inset-0 flex items-center justify-center" />
    </div>
  );
}