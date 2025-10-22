interface SatisfactionRatingProps {
  rating: number;
}

export function SatisfactionRating({ rating }: SatisfactionRatingProps) {
  const getEmoji = (rating: number) => {
    if (rating >= 4.5) return "😊";
    if (rating >= 3.5) return "🙂";
    return "😐";
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">{getEmoji(rating)}</span>
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}
