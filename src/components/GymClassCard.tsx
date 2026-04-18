import { Button, Spinner } from "@heroui/react";

import InfoCard from "./InfoCard";
import type { GymClassResponse } from "@contracts/response/gym-class.response";

interface GymClassCardProps {
  gymClass: GymClassResponse;
  onReserve?: (classId: string) => void;
  isReserving?: boolean;
}

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function GymClassCard({
  gymClass,
  onReserve,
  isReserving = false,
}: GymClassCardProps) {
  const availableSpots = Math.max(gymClass.capacity - gymClass.reserved, 0);

  const headerLeft = (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-600">
        {gymClass.type}
      </p>
      <h3 className="mt-2 text-xl font-semibold">{gymClass.name}</h3>
    </div>
  );

  const headerRight = (
    <span className="rounded-full border bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
      {availableSpots > 0 ? `${availableSpots} spots left` : "Full"}
    </span>
  );

  const content = (
    <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
      <div>
        <p className="text-slate-500">Start time</p>
        <p className="font-medium">{formatTime(gymClass.startTime)}</p>
      </div>
      <div>
        <p className="text-slate-500">End time</p>
        <p className="font-medium">{formatTime(gymClass.endTime)}</p>
      </div>
      <div>
        <p className="text-slate-500">Capacity</p>
        <p className="font-medium">{gymClass.capacity}</p>
      </div>
      <div>
        <p className="text-slate-500">Reserved</p>
        <p className="font-medium">{gymClass.reserved}</p>
      </div>
    </div>
  );

  const footer =
    availableSpots > 0 ? (
      <Button
        className="mx-auto"
        variant="secondary"
        onPress={() => onReserve?.(gymClass.id)}
        isDisabled={isReserving}
      >
        {isReserving ? <Spinner color="current" size="sm" /> : null}
        Reserve
      </Button>
    ) : (
      <p className="text-xs text-slate-500">No spots available.</p>
    );

  return (
    <InfoCard
      headerLeft={headerLeft}
      headerRight={headerRight}
      content={content}
      footer={footer}
    />
  );
}
