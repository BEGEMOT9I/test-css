# config valid only for current version of Capistrano
lock '3.6.1'

Dotenv.load(".env.#{fetch(:stage)}", ".env")

set :application, ENV['APP_NAME']
set :repo_url,    ENV['REPO']

# Default branch is :master
unless ENV['BRANCH'] || ENV['CIRCLE_BRANCH']
  ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
else
  set :branch, ENV['BRANCH'] || ENV['CIRCLE_BRANCH']
end

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/#{ENV['USER_NAME']}/#{ENV['APP_NAME']}"

set :ssh_options, { forward_agent: true, port: ENV['SSH_PORT']&.to_i || 22 }
# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
set :pty, true

set :rvm_ruby_version, `cat .ruby-version`&.chomp || '2.4.2'

set :nvm_type, :user # or :system, depends on your nvm setup
set :nvm_node, `cat .node-version`&.chomp || 'v8.9.0'
set :nvm_map_bins, %w{node npm yarn cross-env webpack}

#set :yarn_target_path, -> { release_path.join('client') } #
set :yarn_flags, '--production --silent --no-progress'    # default
set :yarn_roles, :all                                     # default
set :yarn_env_variables, {}

set :secret_files, [".env.#{fetch(:stage)}"]

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []) + fetch(:secret_files, [])

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets',
                                               'vendor/bundle', 'public/system', 'public/uploads', 'node_modules')
# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

before 'deploy:compile_assets', 'yarn:install'
before 'deploy:compile_assets', 'build:compile'
after  'deploy', 'robots'

namespace :deploy do
  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end
end

namespace :nginx do
  # from root or add to sudoers 'username ALL=NOPASSWD:/etc/init.d/nginx'
  desc 'Restart nginx'
  task :restart do
    on roles(:all) do
      sudo '/etc/init.d/nginx restart'
    end
  end
end

namespace :secrets do
  task :upload do
    on roles(:web) do
      fetch(:linked_files, []).each do |file|
        upload!(file, "#{shared_path}/#{file}", via: :scp) if File.exists?(file)
      end
    end
  end

  task :download do
    on roles(:web) do
      fetch(:linked_files, []).each do |file|
        if test("test -e #{shared_path}/#{file}")
          download!("#{shared_path}/#{file}", file, via: :scp)
        end
      end
    end
  end
end

namespace :build do
  desc 'Install pakages'
  task :compile do
    on roles(:web) do
      within "#{release_path}/client" do
        execute :yarn, 'install'
        execute :yarn, :run, 'build:prod'# && bundle exec rake react_on_rails:locale && yarn run build:production'"
      end
    end
  end
end

namespace :yarn do
  desc 'Install pakages'
  task :install do
    on roles(:web) do
      within release_path do
        execute :yarn, 'install'
      end
    end
  end
end

desc 'Seed migrate'
task :seed do
  on roles(:all) do
    within release_path do
      with rails_env: fetch(:rails_env) do
        execute :bundle, :exec, :rake, 'db:seed'
      end
    end
  end
end

task :robots do
  on roles(:all) do
    within release_path do
      with rails_env: fetch(:rails_env) do
        upload!("config/deploy/templates/robots.txt.#{fetch(:stage)}", "#{release_path}/public/robots.txt", via: :scp)
      end
    end
  end
end
