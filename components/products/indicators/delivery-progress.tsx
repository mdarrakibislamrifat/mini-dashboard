interface DeliveryProgressProps {
  progress: number;
}

export function DeliveryProgress({ progress }: DeliveryProgressProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm font-medium text-muted-foreground">
        {progress}%
      </span>
    </div>
  );
}
