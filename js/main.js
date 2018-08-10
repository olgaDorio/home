import mountNodes from './mountNodes';
import mobileNavigation from './mobileNavigation';
import { scenariosData, devicesData, plannedData } from './data';

import devices from './devices';
import planned from './planned';
import scenarios from './scenarios';

mobileNavigation();

// planned
const plannedContainer = document.querySelector('.planned');
const plannedNodesContainer = document.querySelector('.planned__container');
planned(plannedData, plannedContainer, plannedNodesContainer);

// TODO scenarios
const scenariosContainer = document.querySelector('.block:nth-child(2)');
const scenariosNodesContainer = document.querySelector('.scenarios');
scenarios(scenariosData, scenariosContainer, scenariosNodesContainer);

// devices
const devicesContainer = document.querySelector('.block:nth-child(3)');
const devicesNodesContainer = document.querySelector('.devices');
devices(devicesData, devicesContainer, devicesNodesContainer);
