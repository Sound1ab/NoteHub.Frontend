#!/usr/bin/env bash

CI=true
CIRCLECI=true
CIRCLE_BRANCH=master
CIRCLE_BUILD_NUM=4
CIRCLE_BUILD_URL=https://circleci.com/gh/Sound1ab/noted/4
CIRCLE_COMPARE_URL=
CIRCLE_JOB=build
CIRCLE_NODE_INDEX=0
CIRCLE_NODE_TOTAL=1
CIRCLE_PREVIOUS_BUILD_NUM=3
CIRCLE_PROJECT_REPONAME=noted
CIRCLE_PROJECT_USERNAME=Sound1ab
CIRCLE_REPOSITORY_URL=git@github.com:Sound1ab/noted.git
CIRCLE_SHA1=bd6211e69836aac1ae14d53e4ce05c4ac7983ad7
CIRCLE_SHELL_ENV=/tmp/.bash_env-5cfce2f0671a4600087fd5e2-0-build
CIRCLE_STAGE=build
CIRCLE_USERNAME=Sound1ab
CIRCLE_WORKFLOW_ID=d5c7444b-d4e3-4645-9a9a-df8d9b992315
CIRCLE_WORKFLOW_JOB_ID=fdcb397e-972e-40cd-9009-34a356764105
CIRCLE_WORKFLOW_UPSTREAM_JOB_IDS=
CIRCLE_WORKFLOW_WORKSPACE_ID=d5c7444b-d4e3-4645-9a9a-df8d9b992315
CIRCLE_WORKING_DIRECTORY=~/project

CIRCLE_TOKEN=90083b9fe167a226b9d46b020ad48a5053d5dcb1

LAST_SUCCESSFUL_BUILD_URL="https://circleci.com/api/v1.1/project/github/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/tree/$CIRCLE_BRANCH?filter=completed&limit=1"

LAST_SUCCESSFUL_COMMIT=14965d0fcbb43f9cab033c298116d31692f124dc

if [[ ${LAST_SUCCESSFUL_COMMIT} == "null" ]]; then
  COMMITS="origin/master"
else
  COMMITS="${CIRCLE_SHA1}..${LAST_SUCCESSFUL_COMMIT}"
fi
echo ${COMMITS}

git diff --name-only $COMMITS | cut -d/ -f1 | sort -u > projects

echo -e "Modified directories:\n`cat projects`\n"
buildall=0
#for project in `cat projects`; do
#  if [[ ${project} =~ "Gopkg" || ${project} =~ "vendor" ]]; then
#    buildall=1
#    echo -e "Dependencies change detected. building all $CIRCLE_PROJECT_REPONAME"
#    curl -s -u ${CIRCLE_TOKEN}: \
#        -d build_parameters[CIRCLE_JOB]=all \
#        https://circleci.com/api/v1.1/project/github/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/tree/$CIRCLE_BRANCH
#  fi
#  if [[ ${buildall} -eq 1 ]]; then
#    exit 0
#  fi
#done

#projects_inc_dep=(`cat projects`)
#echo -e "Calculating dependencies\n"
#for dir in `ls -d */`; do
#  for dep in `go list -f '{{ .Deps }}' ./${dir} 2>/dev/null`; do
#    for project_dep in `echo $dep | grep github.com/Sound1ab/$CIRCLE_PROJECT_REPONAME | egrep -v "vendor|${dir%\/}"`; do
#      if [[ " ${projects_inc_dep[@]} " =~ " ${project_dep##*\/} " ]] && ! [[ " ${projects_inc_dep[@]} " =~ " ${dir%\/} " ]]; then
#        echo ${dir}
#        projects_inc_dep+=(${dir%\/})
#      fi
#    done
#  done
#done

#echo "Projects including dependencies: ${projects_inc_dep}"
echo -e "Building: ${projects_inc_dep[@]}\n"
for project in `cat projects`; do
  if grep -Fxq $project project-dirs; then
    printf "\nTriggerring build for project: "$project
#    curl -s -u ${CIRCLE_TOKEN}: \
#      -d build_parameters[CIRCLE_JOB]=${project} \
#      https://circleci.com/api/v1.1/project/github/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/tree/$CIRCLE_BRANCH
  fi
done
