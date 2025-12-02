"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  onConfirm: () => void;
};

export default function SaveChangesButton({ onConfirm }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base rounded-xl shadow-lg shadow-blue-200">
          Guardar Cambios
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm bg-white rounded-lg p-6">
          <div>
            <Dialog.Title className="text-lg font-semibold">¿Guardar cambios?</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              Confirma si deseas guardar los cambios realizados en tu perfil.
            </Dialog.Description>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Dialog.Close asChild>
              <Button variant="outline">Cancelar</Button>
            </Dialog.Close>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={onConfirm}>
              Confirmar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
