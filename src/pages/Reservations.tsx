import { Card } from "@heroui/react";

export default function Reservations() {
  return (
    <main className="min-h-[calc(100vh-4.5rem)] px-4 py-10">
      <div className="mx-auto flex max-w-4xl justify-center">
        <Card className="border shadow-sm">
          <Card.Header className="px-10 pt-10">
            <div className="w-full space-y-3 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-600">
                Reservations
              </p>
              <h1 className="text-3xl font-semibold">Coming soon</h1>
              <p className="text-slate-600">
                This section is reserved for the reservation flow. The header
                navigation is already wired and will point here once the feature
                is implemented.
              </p>
            </div>
          </Card.Header>
        </Card>
      </div>
    </main>
  );
}
