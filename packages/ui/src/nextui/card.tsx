/* v8 ignore start */
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { NextUICardProps } from './types';
import '../../dist/index.css';

export default function NextUICard({ children, ...props }: NextUICardProps) {
  return (
    <Card {...props}>
      <CardBody>{children}</CardBody>
    </Card>
  );
}

export { Card, CardHeader, CardBody, CardFooter };
