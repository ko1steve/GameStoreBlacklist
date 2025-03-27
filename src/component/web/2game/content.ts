import './style.css';
import { Container } from 'typescript-ioc';
import { WebObserverController } from '../../../core/web-observer/web-observer-controller';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { TwoGameWebObserverConfig } from './config';

Container.bind(WebObserverConfig).to(TwoGameWebObserverConfig);
Container.get(WebObserverController);
