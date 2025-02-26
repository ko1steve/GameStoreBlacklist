import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { YuplayProductConfig } from './config';
import { YuplayRecommendedTaskHandler } from './task/recommended';
import { YuplayMostWantedTaskHandler } from './task/mostWanted';
import { YuplayMidweekMadnessTaskHandler } from './task/midweekMadness';
import { YuplayJustArrivedTaskHandler } from './task/justArrived';
import { YuplayComingSoonTaskHandler } from './task/comingSoon';

class YuplayMainPageController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new YuplayRecommendedTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new YuplayMostWantedTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new YuplayMidweekMadnessTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new YuplayJustArrivedTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new YuplayComingSoonTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(YuplayProductConfig);
const controller = new YuplayMainPageController(componentConfig);
controller.running = true;
