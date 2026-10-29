import { UserPlus } from "lucide-react";
import { profileConfig } from "../config/profile";
import { useSaveContact } from "../hooks/useSaveContact";
import { ActionButton } from "./ui/ActionButton";

export function SaveContactButton({ className }: { className?: string }) {
  const saveContact = useSaveContact();
  return (
    <ActionButton
      icon={UserPlus}
      onClick={saveContact}
      variant="gold"
      size="lg"
      ariaLabel={`Save ${profileConfig.person.name} to your contacts`}
      className={className}
    >
      Save Contact
    </ActionButton>
  );
}
