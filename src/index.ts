/*
 * ProjectName: hypergl
 * FilePath: \src\index.ts
 * Created Date: Saturday, August 18th 2018, 4:11:24 pm
 * @author: dadigua
 * @summary: short description for the file
 * -----
 * Last Modified: Wednesday, October 10th 2018, 9:46:08 pm
 * Modified By: dadigua
 * -----
 * Copyright (c) 2018 dadigua
 */
import * as Config from './conf';
import * as math from './math';
// export * from './math';
export * from './conf';
export * from './core/timer';
export * from './application';
export * from './scene/scene';
export * from './graphics';
export * from './material';
export * from './ecs';
export * from './texture';
export * from './lights';

export { Config, math };