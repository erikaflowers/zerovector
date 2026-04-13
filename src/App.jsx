import { Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import ManifestoPage from './pages/ManifestoPage';
import PhilosophyPage from './pages/PhilosophyPage';
import PipelinePage from './pages/PipelinePage';
import BuildersPage from './pages/BuildersPage';
import LeadersPage from './pages/LeadersPage';
import ReadingPage from './pages/ReadingPage';
import OriginPage from './pages/OriginPage';
import InvestiturePage from './pages/InvestiturePage';
import InvestitureChangelogPage from './pages/InvestitureChangelogPage';
import InvestitureSkillsPage from './pages/InvestitureSkillsPage';
import ZerohackPage from './pages/ZerohackPage';
import ZerohackBackgroundPage from './pages/ZerohackBackgroundPage';

import StartPage from './pages/StartPage';
import NamePage from './pages/NamePage';
import EnterprisePage from './pages/EnterprisePage';
import ForHirePage from './pages/ForHirePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<ManifestoPage />} />
        <Route path="/philosophy" element={<PhilosophyPage />} />
        <Route path="/approach" element={<PipelinePage />} />
        <Route path="/for-builders" element={<BuildersPage />} />
        <Route path="/for-leaders" element={<LeadersPage />} />
        <Route path="/for-enterprise" element={<EnterprisePage />} />
        <Route path="/for-hire" element={<ForHirePage />} />
        <Route path="/media" element={<ReadingPage />} />
        <Route path="/origin" element={<OriginPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/ask" element={<Navigate to="/start" replace />} />
        <Route path="/quiz" element={<Navigate to="/start" replace />} />
        <Route path="/name" element={<NamePage />} />
        {/* Redirects from old routes */}
        <Route path="/about" element={<Navigate to="/philosophy" replace />} />
        <Route path="/join" element={<Navigate to="/start" replace />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/pipeline" element={<Navigate to="/approach" replace />} />
        <Route path="/reading" element={<Navigate to="/media" replace />} />
        <Route path="/resources" element={<Navigate to="/media" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/investiture/changelog" element={<InvestitureChangelogPage />} />
      <Route path="/investiture/skills" element={<InvestitureSkillsPage />} />
      <Route path="/investiture" element={<InvestiturePage />} />
      <Route path="/zerohack/apply" element={<Navigate to="/zerohack" replace />} />
      <Route path="/zerohack/background" element={<ZerohackBackgroundPage />} />
      <Route path="/zerohack" element={<ZerohackPage />} />
    </Routes>
  );
}

export default App;
