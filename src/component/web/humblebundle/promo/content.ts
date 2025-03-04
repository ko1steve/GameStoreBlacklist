import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/component-controller';
import { HumbleBundlePromoConfig } from './config';
import { HumbleBundleSlickTrackTaskHandler } from './task/slick-track';
import { HumbleBundleSearchTaskHandler } from './task/search';

class HumbleBundlePromoController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new HumbleBundleSlickTrackTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new HumbleBundleSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(HumbleBundlePromoConfig);
const controller = new HumbleBundlePromoController(componentConfig);
controller.running = true;
