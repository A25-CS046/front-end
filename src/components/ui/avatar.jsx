import { cn } from "./utils";

function Avatar({ className, children, ...props }) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        "inline-flex items-center justify-center rounded-full overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function AvatarImage({ src, alt, className, ...props }) {
  return (
    <img
      src={src}
      alt={alt || "avatar"}
      className={cn("object-cover w-full h-full", className)}
      {...props}
    />
  );
}
;

function AvatarFallback({ className, children, ...props }) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "flex items-center justify-center w-full h-full text-sm font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
