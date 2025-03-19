import { ComponentController } from './../../../../core/component/component-controller';
import { YuplayRecommendedTaskHandler } from './../task/recommended';
import { YuplayMostWantedTaskHandler } from './../task/most-wanted';
import { YuplayMidweekMadnessTaskHandler } from './../task/midweek-madness';
import { YuplayJustArrivedTaskHandler } from './../task/just-arrived';
import { YuplayComingSoonTaskHandler } from './../task/coming-soon';

export class YuplayMainPageController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new YuplayRecommendedTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new YuplayMostWantedTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new YuplayMidweekMadnessTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new YuplayJustArrivedTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new YuplayComingSoonTaskHandler(this.componentConfig, this.dataModel));
  }
}
