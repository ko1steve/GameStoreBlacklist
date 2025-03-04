import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/component-controller';
import { GreenManGamingMainPageConfig } from './config';
import { GreenManGamingMediumProductBlockTaskHandler } from './task/mediumProductBlock';
import { GreenManGamingProductBloackTaskHandler } from 'src/component/web/greenmangaming/mainPage/task/productBlock';

class GreenManGamingMainPageController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingMediumProductBlockTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new GreenManGamingProductBloackTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GreenManGamingMainPageConfig);
const controller = new GreenManGamingMainPageController(componentConfig);
controller.running = true;
