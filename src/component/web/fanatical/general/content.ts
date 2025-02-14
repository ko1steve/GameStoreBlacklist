import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { FanaticalHitCardsRowConfig } from './config';
import { FanaticalHitCardsRowTaskHandler } from './task/hitCardsRow';
import { FanaticalSlickTrackTaskHandler } from './task/slickTrack';

class FanaticalHitCardsRowController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new FanaticalHitCardsRowTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new FanaticalSlickTrackTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(FanaticalHitCardsRowConfig);
const controller = new FanaticalHitCardsRowController(componentConfig);
