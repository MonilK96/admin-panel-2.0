import { Helmet } from 'react-helmet-async';
import { SeminarListView } from 'src/sections/seminar/view';

// ----------------------------------------------------------------------

export default function SeminarListHomePage() {
  return (
    <>
      <Helmet>
        <title> Post: List</title>
      </Helmet>

      <SeminarListView />
    </>
  );
}
