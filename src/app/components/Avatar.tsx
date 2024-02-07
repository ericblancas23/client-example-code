import cx from "clsx";
import camera from "../../resources/img/camera.svg";

export interface AvatarProps {
  initials: string;
}
export function Avatar({ initials }: AvatarProps) {
  return (
    <div
      className={cx(
        "relative",
        "bg-white",
        "flex",
        "h-36",
        "items-center",
        "justify-center",
        "m-auto",
        "rounded-full",
        "text-[#64656F]",
        "text-2xl",
        "w-36",
        "inter800"
      )}
    >
      {initials}
      <div
        className={cx(
          "absolute",
          "bg-white",
          "border-[#EAEAEC]",
          "border-2",
          "bottom-[-0.875rem]",
          "flex",
          "h-8",
          "items-center",
          "justify-center",
          "rounded-full",
          "w-16"
        )}
      >
        {/* TODO: Need better types on svg imports */}
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <img alt="" className="h-4 w-4" src={camera} />
      </div>
    </div>
  );
}
