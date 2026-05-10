/* Production shim for the design-system tweaks overlay.
 * The full editor (useTweaks + TweaksPanel + Tweak* controls) only ships
 * in author/preview builds. In production the panel is hidden and the
 * defaults pass through unchanged. */

function useTweaks(defaults) {
  const [tweaks] = React.useState(defaults);
  return [tweaks, function () {}];
}

function TweaksPanel() { return null; }
function TweakSection() { return null; }
function TweakRadio() { return null; }
function TweakSelect() { return null; }
function TweakToggle() { return null; }
