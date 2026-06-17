import { SpinnerIcon } from "@phosphor-icons/react";

const VARIANT: Record<string, string> = {
  loading: "rgba(243, 98, 34, 0.6)",
  surface_on_surface_subtle: "#635F57",
};

interface SpinnerProps {
  variant: keyof typeof VARIANT;
  size?: number;
}

const Spinner = ({ variant, size = 20 }: SpinnerProps) => {
  return (
    <div className="z-50 flex animate-spin items-center justify-center">
      <SpinnerIcon color={VARIANT[variant]} size={size} />
    </div>
  );
};

export default Spinner;
