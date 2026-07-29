import {Redirect} from '../../components/Redirect';

// Temporary redirect while the compilation is still a work in progress.
// The 'thinking tool:' articles link here, so this keeps those links working
// until the draft is finished and moves back to this URL.
const RedirectPage = () => <Redirect to='/blog/draft-thinking-tools-to-be-more-effective-at-anything/' preserveHash/>;

export default RedirectPage;
