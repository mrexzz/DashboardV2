import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {

  const [averageScore, setAverageScore] = useState(null);
  const [totalCompletedCourses, setTotalCompletedCourses] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState([14]);
  const [skills, setSkills] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [UpComingCourses, setUpComingCourses] = useState([]);

  useEffect(() => {
    fetch('https://demotrainiq.com/case/dashboard')
      .then(response => response.json())
      .then(data => {
        const score = data.data.average_employee_score;
        const completedCourses = data.data.total_completed_courses;
        const skillsData = data.data.skills_in_development.map(skill => ({
          label: skill.skill,
          value: skill.employees,
        }));
        const topEmployeesData = data.data.top_employees.map(employee => ({
          label: employee.name,
          value: employee.current_score,
        }));
        const teamsData = data.data.teams.map(team => ({
          name: team.title,
          value: team.value,
          description: team.description,
        }));
        const Overrol = data.data.teams.map(team => ({
          name: team.overall_score,
        }));
        const UpComingCoursesData = data.data.upcoming_courses.map(upcourse => ({
          id: upcourse.id,
          title: upcourse.title,
          description: upcourse.description,
          assigned_to: upcourse.assigned_to,

        }));
        const inProgressCoursesData = data.data.in_progress_courses.map(course => ({
          id: course.id,
          title: course.title,
          assigned_to: course.assigned_to,
          description: course.description,
        }));
        setUpComingCourses(UpComingCoursesData);
        setInProgressCourses(inProgressCoursesData);
        setTopEmployees(topEmployeesData);
        setAverageScore(score);
        setTotalCompletedCourses(completedCourses);
        setSkills(skillsData);
        setTeams(teamsData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // En yüksek employees değerine sahip beceriyi bulma
  const newsUpdateTitle = topEmployees.length > 0 ? topEmployees[0].label : 'News Update';
  const topSkill = skills.reduce((max, skill) => (skill.value > max.value ? skill : max), { label: '', value: 0 });

  return (
    <Container maxWidth="xl">

      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Average Score"
            total={averageScore}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Employees"
            total={totalEmployees}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Most Featured"
            total={topSkill.value}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Completed Courses"
            total={totalCompletedCourses}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Teams Rates"
            subheader="Performance"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Top Employees"
            chart={{
              series: topEmployees,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Skills in Development"
            subheader="Subjects"
            chart={{
              series: skills,
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Top Skills"
            chart={{
              categories: ['Active Listening', 'React', 'Seo', 'Social Media', 'Problem Solving', 'Python'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Most Successful Employees"
            list={topEmployees.map((employee, index) => ({
              id: index, 
              title: employee.label,
              description: `Current Score: ${employee.value}`, // Haber açıklaması olarak topEmployees'ın value değerini kullanıyoruz.
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: new Date(), 
            }))}
          />
        </Grid>



        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="TimeLine"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Exam: 1 Complated',
                'Exam: 1 Complated',
                'Exam: 1 Complated',
                'Exam: 1 Complated',
                'Lessons: 2 Complated',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12}>
          <Typography variant="h5" style={{ textAlign: "center", marginBottom: "5%" }} sx={{ mt: 10 }}>
            Active Courses
          </Typography>
          {inProgressCourses.map(course => (
            <Accordion key={course.id}>
              <AccordionSummary>
               + <Typography>{course.title} by <b>{course.assigned_to}</b></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {course.description}
                  Details about {course.title} can go here.
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid xs={12}>
          <Typography variant="h5" style={{ textAlign: "center", marginBottom: "5%" }} sx={{ mt: 5 }}>
            UpComing Courses
          </Typography>
          {UpComingCourses.map(upcourse => (
            <Accordion key={upcourse.id}>
              <AccordionSummary>
                + <Typography>{upcourse.title} by <b>{upcourse.assigned_to}</b></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {upcourse.description}
                  Details about {upcourse.title} can go here.
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid xs={12}>
          <Typography variant="h6" sx={{ mt: 5 }}>
            Teams Descriptions
          </Typography>
          {teams.map((team, index) => (
            <Typography key={index} variant="body1" sx={{ mt: 2 }}>
              <strong>{team.name}:</strong> {team.description}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
