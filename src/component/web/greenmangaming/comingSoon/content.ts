import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { GreenManGamingComingSoonConfig } from './config';
import { GreenManGamingComingSoonTaskHandler } from './task/comingSoon';
import { GreenManGamingSliderListTaskHandler } from './task/sliderList';

class GreenManGamingComingController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingComingSoonTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GreenManGamingSliderListTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GreenManGamingComingSoonConfig);
const controller = new GreenManGamingComingController(componentConfig);
