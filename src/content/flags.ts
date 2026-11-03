/**
 * Switches for content that is written but not ready to publish. They live in
 * their own module with no imports so next.config.ts can read them too, and so
 * turning a section back on is a one-line change in one place.
 */

/**
 * Case studies. While this is false the site has none at all: the work grids,
 * the Work nav item and every /work URL drop out on their own, and /work
 * redirects to /services instead of 404ing for anyone holding an old link.
 * Flip to true once there are real case studies with the client's sign-off and
 * real numbers.
 */
export const SHOW_CASE_STUDIES = false;

/**
 * The team grid on About and Culture. Flip to true once there are real names,
 * roles, bios and photos; until then the site shows no team at all rather than
 * placeholder cards.
 */
export const SHOW_TEAM = false;
