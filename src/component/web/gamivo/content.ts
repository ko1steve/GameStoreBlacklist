import './style.css';
import { Container } from 'typescript-ioc';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { WebObserverController } from '../../../core/web-observer/web-observer-controller';
import { GamivoWebObserverConfig } from './config';

Container.bind(WebObserverConfig).to(GamivoWebObserverConfig);
Container.get(WebObserverController);
