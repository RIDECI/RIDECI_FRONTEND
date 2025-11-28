
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="Buscar chats" />
      <Button type="submit" variant="outline">
        Buscar 🔍
      </Button>
    </div>
  )
}

