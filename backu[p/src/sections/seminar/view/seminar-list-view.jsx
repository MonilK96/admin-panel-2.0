import orderBy from 'lodash/orderBy';
import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useDebounce } from 'src/hooks/use-debounce';

import { POST_SORT_OPTIONS } from 'src/_mock';
import { useGetPosts, useSearchPosts } from 'src/api/blog';
import { useGetSeminar } from 'src/api/seminar';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SeminarSort from '../seminar-sort';
import SeminarSearch from '../seminar-search';
import SeminarListHorizontal from '../seminar-list-horizontal';

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: 'all',
};

// ----------------------------------------------------------------------

export default function SeminarListView() {
  const settings = useSettingsContext();

  const [sortBy, setSortBy] = useState('latest');
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const { Seminar, SeminarLoading, SeminarError } = useGetSeminar();

  const { data: posts, loading: postsLoading, error: postsError } = useGetPosts();
  const {
    data: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useSearchPosts(debouncedQuery);

  useEffect(() => {
    if (SeminarError) console.error('Error fetching seminar:', SeminarError);
    if (postsError) console.error('Error fetching posts:', postsError);
    if (searchError) console.error('Error searching posts:', searchError);
  }, [SeminarError, postsError, searchError]);

  const dataFiltered = applyFilter({
    inputData: [1] || [],
    filters,
    sortBy,
  });

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  const handleFilterPublish = useCallback(
    (event, newValue) => {
      handleFilters('publish', newValue);
    },
    [handleFilters]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Blog',
            href: paths.dashboard.post.root,
          },
          {
            name: 'List',
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.post.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Post
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <SeminarSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(title) => paths.dashboard.post.details(title)}
        />

        <SeminarSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      <SeminarListHorizontal posts={dataFiltered} loading={postsLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { publish } = filters;

  if (!inputData) return [];

  let filteredData = inputData;

  if (sortBy === 'latest') {
    filteredData = orderBy(filteredData, ['createdAt'], ['desc']);
  } else if (sortBy === 'oldest') {
    filteredData = orderBy(filteredData, ['createdAt'], ['asc']);
  } else if (sortBy === 'popular') {
    filteredData = orderBy(filteredData, ['totalViews'], ['desc']);
  }

  if (publish !== 'all') {
    filteredData = filteredData.filter((post) => post.publish === publish);
  }

  return filteredData;
};
