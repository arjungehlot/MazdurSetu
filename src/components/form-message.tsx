export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  if (!message) return null;

  return (
    <div className="flex flex-col gap-2 w-full text-sm">
      {"success" in message && (
        <div className="text-green-500 border-l-2 border-green-500 px-4 py-2 bg-green-50 dark:bg-green-950/20 rounded">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-red-500 border-l-2 border-red-500 px-4 py-2 bg-red-50 dark:bg-red-950/20 rounded">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-foreground border-l-2 border-gray-300 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded">
          {message.message}
        </div>
      )}
    </div>
  );
}
