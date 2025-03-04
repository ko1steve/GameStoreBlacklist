import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/component-controller';
import { GreenManGamingComingSoonConfig } from './config';
import { GreenManGamingComingSoonTaskHandler as GreenManGamingLargeProductBlockTaskHandler } from './task/large-product-block';
import { GreenManGamingSliderListTaskHandler } from './task/slider-list';

class GreenManGamingComingController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingLargeProductBlockTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GreenManGamingSliderListTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GreenManGamingComingSoonConfig);
const controller = new GreenManGamingComingController(componentConfig);
controller.running = true;
