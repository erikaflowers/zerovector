// Zero-Vector Design — Content Layer
// Single source of truth. Each page's content lives in its own file.
// This file re-exports the combined object so existing imports work unchanged.
//
// To edit content for a specific page, open the corresponding file:
//   home.js, philosophy.js, approach.js, builders.js, leaders.js,
//   media.js, origin.js, start.js, investiture.js, name.js,
//   enterprise.js, zerohack.js, zerohack-background.js

import home from './home';
import philosophy from './philosophy';
import approach from './approach';
import builders from './builders';
import leaders from './leaders';
import media from './media';
import origin from './origin';
import start from './start';
import investiture from './investiture';
import name from './name';
import enterprise from './enterprise';
import zerohack from './zerohack';
import zerohackBackground from './zerohack-background';

const en = {
  home,
  philosophy,
  approach,
  builders,
  leaders,
  enterprise,
  media,
  origin,
  start,
  investiture,
  name,
  zerohack,
  zerohackBackground,
};

export default en;
