import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Tax</CardTitle>
        <CardDescription>Discription</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2">
        <Button type="submit" className="w-1/2 bg-red-700">
          Delete
        </Button>
        <Button variant="outline" className="w-1/2 bg-green-700">
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
