export const PORTAL_ID = "retro-tool-dnd-portal";

export function dndPortal() {
  if (!document) {
    throw new Error("DndPortal can only be used in the browser");
  }

  const portal = document.getElementById(PORTAL_ID);

  if (!portal) {
    const newPortal = document.createElement("div");
    newPortal.id = PORTAL_ID;
    document.body.appendChild(newPortal);
    return newPortal;
  } else {
    return portal;
  }
}
