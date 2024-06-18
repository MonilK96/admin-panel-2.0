import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  inquiry: icon('ic_label'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  batches: <Iconify icon="solar:users-group-rounded-bold-duotone" sx={{ width: 1, height: 1 }} />,
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('app'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
          {
            title: t('ecommerce'),
            path: paths.dashboard.general.ecommerce,
            icon: ICONS.ecommerce,
          },
          {
            title: t('analytics'),
            path: paths.dashboard.general.analytics,
            icon: ICONS.analytics,
          },
          {
            title: t('banking'),
            path: paths.dashboard.general.banking,
            icon: ICONS.banking,
          },
          {
            title: t('booking'),
            path: paths.dashboard.general.booking,
            icon: ICONS.booking,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          // STUDENT
          {
            title: t('student'),
            path: paths.dashboard.student.root,
            icon: ICONS.user,
            children: [
              { title: t('list'), path: paths.dashboard.student.list },
              { title: t('card'), path: paths.dashboard.student.cards },
            ],
          },

          // FEES
          {
            title: t('fees'),
            path: paths.dashboard.general.fees,
            icon: ICONS.invoice,
          },

          // EMPLOYEE
          {
            title: t('employee'),
            path: paths.dashboard.employee.list,
            icon: ICONS.user,
          },

          // INQUIRY
          {
            title: t('inquiry'),
            path: paths.dashboard.inquiry.root,
            icon: ICONS.inquiry,
          },

          // PRODUCT
          {
            title: t('product'),
            path: paths.dashboard.product.root,
            icon: ICONS.product,
            children: [
              { title: t('list'), path: paths.dashboard.product.root },
              {
                title: t('details'),
                path: paths.dashboard.product.demo.details,
              },
              { title: t('create'), path: paths.dashboard.product.new },
              { title: t('edit'), path: paths.dashboard.product.demo.edit },
            ],
          },

          // ORDER
          {
            title: t('order'),
            path: paths.dashboard.order.root,
            icon: ICONS.order,
            children: [
              { title: t('list'), path: paths.dashboard.order.root },
              { title: t('details'), path: paths.dashboard.order.demo.details },
            ],
          },

          // DEMO
          {
            title: t('Demo'),
            path: paths.dashboard.demo.root,
            icon: ICONS.order,
            children: [{ title: t('list'), path: paths.dashboard.demo.root }],
          },

          // SEMINAR
          {
            title: t('seminar'),
            path: paths.dashboard.seminar.root,
            icon: ICONS.order,
          },

          // ATTENDANCE
          {
            title: t('attendance'),
            path: paths.dashboard.attendance.root,
            icon: ICONS.order,
            children: [{ title: t('list'), path: paths.dashboard.attendance.root }],
          },

          // EXPENSES
          {
            title: t('expenses'),
            path: paths.dashboard.expenses.list,
            icon: ICONS.analytics,
            // children: [{ title: t('list'), path: paths.dashboard.expenses.list }],
          },
          {
            title: t('examination'),
            path: paths.dashboard.examination.list,
            icon: ICONS.analytics,
            // children: [{ title: t('list'), path: paths.dashboard.expenses.list }],
          },

          // BATCH
          {
            title: t('batches'),
            path: paths.dashboard.batches.root,
            icon: ICONS.batches,
            // children: [
            // { title: t('list'), path: paths.dashboard.batches.root },
            // { title: t('details'), path: paths.dashboard.batches.demo.details },
            // ],
          },

          // INVOICE
          {
            title: t('invoice'),
            path: paths.dashboard.invoice.root,
            icon: ICONS.invoice,
            children: [
              { title: t('list'), path: paths.dashboard.invoice.root },
              {
                title: t('details'),
                path: paths.dashboard.invoice.demo.details,
              },
              { title: t('create'), path: paths.dashboard.invoice.new },
              { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
            ],
          },

          // CALENDAR
          {
            title: t('calendar'),
            path: paths.dashboard.calendar,
            icon: ICONS.calendar,
          },

          // KANBAN
          {
            title: t('kanban'),
            path: paths.dashboard.kanban,
            icon: ICONS.kanban,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
