import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { HumbleBundlePromoConfig } from './config';
import { HumbleBundleSlickTrackTaskHandler } from './task/slickTrack';
import { HumbleBundleSearchTaskHandler } from './task/search';

class HumbleBundlePromoController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new HumbleBundleSlickTrackTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new HumbleBundleSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(HumbleBundlePromoConfig);
const controller = new HumbleBundlePromoController(componentConfig);
