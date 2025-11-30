import React, { useState } from 'react';
import Layout from './components/Layout';
import DashboardView from './components/DashboardView';
import SkillsView from './components/SkillsView';
import OracleView from './components/OracleView';
import QuestsView from './components/QuestsView';
import { ViewState, SkillData, Quest } from './types';
import { INITIAL_SKILLS, INITIAL_QUESTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [skills, setSkills] = useState<SkillData[]>(INITIAL_SKILLS);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <DashboardView skills={skills} quests={quests} />;
      case 'SKILLS':
        return <SkillsView skills={skills} />;
      case 'ORACLE':
        return <OracleView skills={skills} />;
      case 'QUESTS':
        return <QuestsView quests={quests} skills={skills} setQuests={setQuests} setSkills={setSkills} />;
      default:
        return <DashboardView skills={skills} quests={quests} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
