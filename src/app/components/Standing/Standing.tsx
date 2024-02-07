import { StandingItem } from "./StandingItem";

export function Standing() {
  return (
    <div className="flex flex-col gap-3">
      <StandingItem name="Jane Doe" intros={6} linkedInUrl="" />
      <StandingItem name="Jack Harlows" intros={6} linkedInUrl="" />
      <StandingItem name="Harry Mack" intros={6} linkedInUrl="" />
      <StandingItem name="Don James" intros={6} linkedInUrl="" />
      <StandingItem name="Mika Noel" intros={6} linkedInUrl="" />
    </div>
  );
}
