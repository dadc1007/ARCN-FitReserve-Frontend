import { Card } from "@heroui/react";

interface InfoCardProps {
  headerLeft: React.ReactNode;
  headerRight: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
  headerClassName?: string;
}

export default function InfoCard({
  headerLeft,
  headerRight,
  content,
  footer,
  headerClassName = "flex justify-between gap-4",
}: InfoCardProps) {
  return (
    <Card className="p-7">
      <Card.Header className={headerClassName}>
        {headerLeft}
        {headerRight}
      </Card.Header>
      <Card.Content className="mt-4">{content}</Card.Content>
      <Card.Footer className="border-t border-divider pt-4">
        {footer}
      </Card.Footer>
    </Card>
  );
}
