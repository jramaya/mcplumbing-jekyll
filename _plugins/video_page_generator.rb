require 'pry-byebug'

module Jekyll
  class VideoPage < Page
    def initialize(site, base, dir, video)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'video.html')
      self.data['video'] = video

      self.data['title'] = video['title']
    end
  end

  class VideoPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? 'video'
        dir = site.config['video_dir'] || 'videos'
        site.data['videos'].each do |video|
          site.pages << VideoPage.new(site, site.source, File.join(dir, video['permalink']), video)
        end
      end
    end
  end
end
