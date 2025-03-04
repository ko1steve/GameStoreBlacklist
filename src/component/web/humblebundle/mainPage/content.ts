import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/component-controller';
import { HumbleBundleThreeConfig } from './config';
import { HumbleBundleThreeTaskHandler } from './task/three';
import { HumbleBundleSlickTrackTaskHandler } from './task/slick-track';

class HumbleBundleThreeController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new HumbleBundleThreeTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new HumbleBundleSlickTrackTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(HumbleBundleThreeConfig);
const controller = new HumbleBundleThreeController(componentConfig);
controller.running = true;
