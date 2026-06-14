import { Modal } from "../../../shared/ui/modal";
import { Button } from "../../../shared/ui/button";
import { Avatar } from "../../../shared/ui/avatar";

// Mock data for layout. Replace with API response when the backend is wired up.
const MOCK_BLOCKED = [
  {
    id: "1",
    name: "Tony Stark",
    role: "Sponsor",
    avatarUrl: "https://placehold.co/48x48",
  },
  {
    id: "2",
    name: "Tony Stark",
    role: "Sponsor",
    avatarUrl: "https://placehold.co/48x48",
  },
  {
    id: "3",
    name: "Tony Stark",
    role: "Sponsor",
    avatarUrl: "https://placehold.co/48x48",
  },
  {
    id: "4",
    name: "Tony Stark",
    role: "Sponsor",
    avatarUrl: "https://placehold.co/48x48",
  },
];

export default function BlockedUsersModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-primary">
          Blockerade användare
        </h2>

        <div className="flex flex-col">
          {MOCK_BLOCKED.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between py-4 border-b border-gray-300 last:border-b-0"
            >
              {/* Left: avatar + name/role */}
              <div className="flex items-center gap-3">
                <Avatar src={user.avatarUrl} size="sm" />
                <div className="flex flex-col">
                  <span className="font-bold text-primary">{user.name}</span>
                  <span className="text-sm text-gray-500">{user.role}</span>
                </div>
              </div>

              {/* Right: unblock button */}
              <Button
                variant="outline"
                onClick={() => console.log("TODO: unblock", user.id)}
                className="px-6 py-2 font-medium"
              >
                Ta bort blockering
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
