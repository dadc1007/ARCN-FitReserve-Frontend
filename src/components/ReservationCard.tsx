import { Button, Spinner } from "@heroui/react";

import InfoCard from "./InfoCard";
import type { ReservationResponse } from "@contracts/response/reservation.response";

interface ReservationCardProps {
  reservation: ReservationResponse;
  onCancel?: (reservationId: string) => void;
  isCancelling?: boolean;
}

export default function ReservationCard({
  reservation,
  onCancel,
  isCancelling = false,
}: ReservationCardProps) {
  const isActive = reservation.status === "ACTIVE";

  const formatTime = (value: string | null) => {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const headerLeft = <h3 className="font-semibold">Reservation</h3>;

  const headerRight = (
    <span
      className={
        isActive
          ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
          : "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
      }
    >
      {reservation.status}
    </span>
  );

  const content = (
    <div className="text-sm text-slate-600">
      <p className="font-medium text-slate-800">{reservation.className ?? "Gym class"}</p>
      <p>
        <span className="font-medium text-slate-700">Start:</span>{" "}
        {formatTime(reservation.startTime)}
      </p>
      <p>
        <span className="font-medium text-slate-700">End:</span>{" "}
        {formatTime(reservation.endTime)}
      </p>
    </div>
  );

  const footer = isActive ? (
    <Button
      className="mx-auto"
      variant="danger"
      onPress={() => onCancel?.(reservation.id)}
      isDisabled={isCancelling}
    >
      {isCancelling ? <Spinner color="current" size="sm" /> : null}
      Cancel reservation
    </Button>
  ) : (
    <p className="text-xs text-slate-500">This reservation is cancelled.</p>
  );

  return (
    <InfoCard
      headerLeft={headerLeft}
      headerRight={headerRight}
      content={content}
      footer={footer}
      headerClassName="flex items-center justify-between gap-2"
    />
  );
}
