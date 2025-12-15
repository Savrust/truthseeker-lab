interface BiasBarProps {
  left: number;
  center: number;
  right: number;
  className?: string;
}

export const BiasBar = ({ left, center, right, className = "" }: BiasBarProps) => {
  const total = left + center + right;
  const leftPercent = (left / total) * 100;
  const centerPercent = (center / total) * 100;
  const rightPercent = (right / total) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex h-3 rounded-full overflow-hidden border border-border">
        {leftPercent > 0 && (
          <div
            className="bg-blue-500 transition-all"
            style={{ width: `${leftPercent}%` }}
            title={`Left: ${leftPercent.toFixed(1)}%`}
          />
        )}
        {centerPercent > 0 && (
          <div
            className="bg-gray-400 transition-all"
            style={{ width: `${centerPercent}%` }}
            title={`Center: ${centerPercent.toFixed(1)}%`}
          />
        )}
        {rightPercent > 0 && (
          <div
            className="bg-red-500 transition-all"
            style={{ width: `${rightPercent}%` }}
            title={`Right: ${rightPercent.toFixed(1)}%`}
          />
        )}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{leftPercent.toFixed(0)}% Left</span>
        <span>{centerPercent.toFixed(0)}% Center</span>
        <span>{rightPercent.toFixed(0)}% Right</span>
      </div>
    </div>
  );
};

