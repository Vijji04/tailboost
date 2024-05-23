// import React, { useState, useEffect } from 'react';
// import { Table,Pagination } from 'antd';
// import Axios from 'axios';

// const DataTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // const response = await Axios.get("https://openlibrary.org/subjects/love.json?limit=10");
// const response = await Axios.get(`https://openlibrary.org/subjects/love.json?limit=${pageSize}&offset=${(page - 1) * pageSize}`);

//         const works = response.data.works;

//         // Fetch birthdate, topwork, and average rating for each author
//         const updatedWorks = await Promise.all(
//           works.map(async (work) => {
//             const authors = await Promise.all(
//               work.authors.map(async (author) => {
//                 const authorResponse = await Axios.get(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(author.name)}`);
//                 const authorData = authorResponse.data.docs[0];
//                 return {
//                   ...author,
//                   birthdate: authorData ? authorData.birth_date : 'Unknown',
//                   topwork: authorData ? authorData.top_work : 'Unknown',
//                 };
//               })
//             );

//             // Fetch average rating for the book
//             const bookResponse = await Axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(work.title)}`);
//             const bookData = bookResponse.data.docs[0];
//             const averageRating = bookData ? bookData.ratings_average : 'Unknown';

//             return {
//               ...work,
//               authors,
//               topwork: authors.map(author => author.topwork).join(', '),
//               averageRating,
//             };
//           })
//         );

//         setData(updatedWorks);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching data", error);
//       }
//     }

//     fetchData();
//   }, []);

//   const columns = [
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//       sorter: (a, b) => a.title.localeCompare(b.title),
//       editable: true,
//     },
//     {
//       title: 'Author',
//       dataIndex: 'authors',
//       key: 'author',
//       render: authors => authors.map(author => author.name).join(', '),
//       sorter: (a, b) => {
//         const authorsA = a.authors.map(author => author.name).join(', ');
//         const authorsB = b.authors.map(author => author.name).join(', ');
//         return authorsA.localeCompare(authorsB);
//       },
//     },
//     {
//       title: 'Birthdate',
//       dataIndex: 'authors',
//       key: 'birthdate',
//       render: authors => authors.map(author => author.birthdate).join(', '),
//       sorter: (a, b) => {
//         const birthdateA = a.authors.map(author => author.birthdate).join(', ');
//         const birthdateB = b.authors.map(author => author.birthdate).join(', ');
//         return birthdateA.localeCompare(birthdateB);
//       },
//     },
//     {
//       title: 'First Published Year',
//       dataIndex: 'first_publish_year',
//       key: 'first_publish_year',
//       sorter: (a, b) => a.first_publish_year - b.first_publish_year,
//       editable: true,
//     },
//     {
//       title: 'Best Work',
//       dataIndex: 'topwork',
//       key: 'topwork',
//     },
//     {
//       title: 'Subject',
//       dataIndex: 'subject',
//       key: 'subject',
//       render: subject => subject.slice(0, 3).join(', '),
//       sorter: (a, b) => {
//         const subjectsA = a.subject.slice(0, 3).join(', ');
//         const subjectsB = b.subject.slice(0, 3).join(', ');
//         return subjectsA.localeCompare(subjectsB);
//       },
//       editable: true,
//     },
//     {
//       title: 'Average Rating',
//       dataIndex: 'averageRating',
//       key: 'averageRating',
//       sorter: (a, b) => a.averageRating - b.averageRating,
//     },
//   ];

//   return 
//   <div>
//     <Table dataSource={data} columns={columns} loading={loading} rowKey="key" />;
// <Pagination
//         current={currentPage}
//         pageSize={pageSize}
//         total={total}
//         onChange={handlePageChange}
//         showSizeChanger
//         pageSizeOptions={['10', '20', '50', '100']}
//       />
//   </div>
  
// };

// export default DataTable;



import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'antd';
import Axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const authorCache = {};

  useEffect(() => {
    async function fetchData(page, pageSize) {
      setLoading(true);
      try {
        const response = await Axios.get(`https://openlibrary.org/subjects/love.json?limit=${pageSize}&offset=${(page - 1) * pageSize}`);
        const works = response.data.works;
        setTotal(response.data.work_count);

        // Fetch birthdate, topwork, and average rating for each author
        const updatedWorks = await Promise.all(
          works.map(async (work) => {
            const authors = await Promise.all(
              work.authors.map(async (author) => {
                if (!authorCache[author.name]) {
                  const authorResponse = await Axios.get(`https://openlibrary.org/search/authors.json?q=${encodeURIComponent(author.name)}`);
                  const authorData = authorResponse.data.docs[0];
                  authorCache[author.name] = {
                    birthdate: authorData ? authorData.birth_date : 'Unknown',
                    topwork: authorData ? authorData.top_work : 'Unknown',
                  };
                }
                return {
                  ...author,
                  ...authorCache[author.name],
                };
              })
            );

            // Fetch average rating for the book
            const bookResponse = await Axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(work.title)}`);
            const bookData = bookResponse.data.docs[0];
            const averageRating = bookData ? bookData.ratings_average : 'Unknown';

            return {
              ...work,
              authors,
              topwork: authors.map(author => author.topwork).join(', '),
              averageRating,
            };
          })
        );

        setData(updatedWorks);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setLoading(false);
      }
    }

    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Author',
      dataIndex: 'authors',
      key: 'author',
      render: authors => authors.map(author => author.name).join(', '),
      sorter: (a, b) => {
        const authorsA = a.authors.map(author => author.name).join(', ');
        const authorsB = b.authors.map(author => author.name).join(', ');
        return authorsA.localeCompare(authorsB);
      },
    },
    {
      title: 'Birthdate',
      dataIndex: 'authors',
      key: 'birthdate',
      render: authors => authors.map(author => author.birthdate).join(', '),
      sorter: (a, b) => {
        const birthdateA = a.authors.map(author => author.birthdate).join(', ');
        const birthdateB = b.authors.map(author => author.birthdate).join(', ');
        return birthdateA.localeCompare(birthdateB);
      },
    },
    {
      title: 'First Published Year',
      dataIndex: 'first_publish_year',
      key: 'first_publish_year',
      sorter: (a, b) => a.first_publish_year - b.first_publish_year,
    },
    {
      title: 'Best Work',
      dataIndex: 'topwork',
      key: 'topwork',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: subject => subject.slice(0, 3).join(', '),
      sorter: (a, b) => {
        const subjectsA = a.subject.slice(0, 3).join(', ');
        const subjectsB = b.subject.slice(0, 3).join(', ');
        return subjectsA.localeCompare(subjectsB);
      },
    },
    {
      title: 'Average Rating',
      dataIndex: 'averageRating',
      key: 'averageRating',
      sorter: (a, b) => {
        const ratingA = a.averageRating === 'Unknown' ? 0 : a.averageRating;
        const ratingB = b.averageRating === 'Unknown' ? 0 : b.averageRating;
        return ratingA - ratingB;
      },
    },
  ];

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="key"
        pagination={false}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={['10', '20', '50', '100']}
      />
    </div>
  );
};

export default DataTable;
