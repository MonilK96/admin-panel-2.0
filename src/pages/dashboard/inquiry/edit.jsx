import { Helmet } from 'react-helmet-async';

import  InquiryEditView  from 'src/sections/inquiry/inquiry-new-edit-form';


// ----------------------------------------------------------------------

export default function InquiryEditPage() {


  return (
    <>
      <Helmet>
        <title> Dashboard: Inquiry Edit</title>
      </Helmet>

      <InquiryEditView />
    </>
  );
}
